// src/pages/api/contacto.ts
// Única ruta del sitio que se renderiza a demanda (prerender = false): todo lo demás sigue
// siendo estático. En Vercel se despliega como función; en `astro dev` corre igual, así que el
// formulario se prueba local sin `vercel dev`.
// Entrega el formulario por Brevo, que ya figura como encargado del tratamiento en /privacidad:
// no se suma ningún proveedor nuevo, que es lo mínimo exigible a una empresa que vende
// cumplimiento de la Ley 21.719.
//
// Variable de entorno requerida en Vercel: BREVO_API_KEY.
// Sin ella la función responde 503 y el formulario muestra el correo como alternativa.

import type { APIContext } from "astro";

export const prerender = false;

const BUZON = "hola@coworkers.cl";

/** Mínimo de segundos entre que se pinta el formulario y se envía. Un bot rellena al instante. */
const MIN_SEGUNDOS = 3;

/** Ventana y tope por IP. Es memoria del contenedor: se pierde en frío y no se comparte entre
 *  instancias. Frena el ruido repetido, no un ataque distribuido; para eso está el honeypot. */
const VENTANA_MS = 60_000;
const TOPE_VENTANA = 5;
const vistos = new Map<string, number[]>();

function limitado(ip: string): boolean {
  const ahora = Date.now();
  const previos = (vistos.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  previos.push(ahora);
  vistos.set(ip, previos);
  if (vistos.size > 500) vistos.clear(); // techo de memoria, no es un caché
  return previos.length > TOPE_VENTANA;
}

const limpiar = (v: unknown, max: number): string =>
  typeof v === "string"
    ? v
        .replace(/[\u0000-\u001f\u007f]/g, " ")
        .trim()
        .slice(0, max)
    : "";

const json = (estado: number, cuerpo: Record<string, unknown>) =>
  new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

export async function POST({
  request,
  clientAddress,
}: APIContext): Promise<Response> {
  const ip =
    clientAddress ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "sin-ip";
  if (limitado(ip)) {
    return json(429, {
      error: "Demasiados envíos seguidos. Intenta en un minuto.",
    });
  }

  // Sin JavaScript el formulario postea nativo como form-urlencoded. En ese caso no sirve
  // devolver JSON (el navegador lo pintaría crudo): se responde con una redirección a /gracias.
  const tipo = request.headers.get("content-type") ?? "";
  const nativo = !tipo.includes("application/json");

  const responder = (estado: number, cuerpo: { error?: string }): Response => {
    if (!nativo) return json(estado, estado < 400 ? { ok: true } : cuerpo);
    return new Response(null, {
      status: 303,
      headers: { location: estado < 400 ? "/gracias" : "/gracias#problema" },
    });
  };

  let datos: Record<string, unknown>;
  try {
    datos = nativo
      ? Object.fromEntries(await request.formData())
      : await request.json();
  } catch {
    return responder(400, { error: "No pudimos leer el formulario." });
  }

  // Honeypot: campo oculto que una persona nunca ve. Si viene lleno, es un bot.
  // Se responde 200 a propósito: el bot cree que funcionó y no reintenta.
  if (limpiar(datos.empresa_web, 200)) return responder(200, {});

  const abierto = Number(datos.ts);
  if (
    Number.isFinite(abierto) &&
    (Date.now() - abierto) / 1000 < MIN_SEGUNDOS
  ) {
    return responder(200, {});
  }

  const nombre = limpiar(datos.nombre, 120);
  const telefono = limpiar(datos.telefono, 40);
  const correo = limpiar(datos.correo, 200);
  const mensaje = limpiar(datos.mensaje, 2000);

  if (nombre.length < 2) return responder(400, { error: "Falta tu nombre." });
  if (telefono.replace(/\D/g, "").length < 8) {
    return responder(400, { error: "Revisa el teléfono: faltan dígitos." });
  }
  if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) {
    return responder(400, { error: "Ese correo no se ve bien escrito." });
  }

  const clave = import.meta.env.BREVO_API_KEY ?? process.env.BREVO_API_KEY;
  if (!clave) {
    console.error("[contacto] falta BREVO_API_KEY");
    return responder(503, {
      error: "No pudimos enviarlo. Escríbenos a " + BUZON + ".",
    });
  }

  const cuerpo = [
    `Nombre:   ${nombre}`,
    `Teléfono: ${telefono}`,
    `Correo:   ${correo || "no dejó"}`,
    "",
    mensaje || "(sin mensaje)",
    "",
    "—",
    "Enviado desde el formulario de coworkers.cl",
  ].join("\n");

  try {
    const r = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": clave,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Formulario coworkers.cl", email: BUZON },
        to: [{ email: BUZON }],
        // Responder al correo va directo al cliente cuando dejó uno.
        ...(correo ? { replyTo: { email: correo, name: nombre } } : {}),
        subject: `Agendar 30 min — ${nombre}`,
        textContent: cuerpo,
      }),
    });

    if (!r.ok) {
      console.error("[contacto] Brevo respondió", r.status, await r.text());
      return responder(502, {
        error: "No pudimos enviarlo. Escríbenos a " + BUZON + ".",
      });
    }
  } catch (e) {
    console.error("[contacto] fallo de red", e);
    return responder(502, {
      error: "No pudimos enviarlo. Escríbenos a " + BUZON + ".",
    });
  }

  return responder(200, {});
}

/** Cualquier otro método: el formulario solo postea. */
export function GET(): Response {
  return json(405, { error: "Método no permitido." });
}

export const ALL = GET;
