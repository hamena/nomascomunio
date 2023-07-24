export function getFormattedDateTime(): string {
  const now = new Date();

  // Obtenemos los componentes de la fecha y hora actual
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  // Concatenamos los componentes para obtener el formato deseado
  const formattedDateTime = `${year}${month}${day}-${hours}${minutes}`;

  return formattedDateTime;
}
