// src/config.ts
// Datos de contacto en un solo lugar. El correo es el canal que existe hoy; WhatsApp es el que
// debería existir (docs/MENSAJES.md pide "alguien a quien llamar", y la página vende cobranza
// por WhatsApp: agendar por correo escrito a mano contradice lo que ofrecemos).
//
// Para encender WhatsApp: pon el número en formato internacional sin signos, p. ej. "56912345678".
// Mientras esté vacío, la línea de WhatsApp simplemente no se pinta.
export const WHATSAPP = "";

export const EMAIL = "hola@coworkers.cl";

/** Enlace de WhatsApp con mensaje inicial, o null si todavía no hay número. */
export function waLink(text: string): string | null {
  return WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
    : null;
}

/** mailto con asunto. */
export function mailto(subject: string): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
}
