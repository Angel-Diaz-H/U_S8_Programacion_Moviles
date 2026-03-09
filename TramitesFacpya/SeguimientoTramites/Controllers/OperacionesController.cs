using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace SeguimientoTramites.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OperacionesController : ControllerBase
    {
        private readonly ILogger<OperacionesController> _logger;

        public OperacionesController(ILogger<OperacionesController> logger)
        {
            _logger = logger; 
        }

        [HttpGet("Mensaje")]
        public IActionResult Mensaje()
        {
            return Ok("Hola desde el controlador de operaciones!");
        }
        
        // Sumar
        [HttpGet("Sumar/{Numero1:int}/{Numero2:int}")]
        public IActionResult Sumar(int Numero1, int Numero2)
        {
            return Ok($"La suma de {Numero1} y {Numero2} es {Numero1 + Numero2}");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [HttpGet("Error")]
        public IActionResult Error()
        {
            return Problem("Ocurrió un error inesperado.");
        }

        // 4. Restar
        [HttpGet("Restar/{Numero1:int}/{Numero2:int}")]
        public IActionResult Restar(int Numero1, int Numero2)
        {
            return Ok($"La resta de {Numero1} - {Numero2} es {Numero1 - Numero2}");
        }

        // 5. Mutiplicar.
        [HttpGet("Multiplicar/{Numero1:int}/{Numero2:int}")]
        public IActionResult Multiplicar(int Numero1, int Numero2)
        {
            return Ok($"La multiplicación de {Numero1} * {Numero2} es {Numero1 * Numero2}");
        }

        // 6. Promedio de tres calificaciones.
        [HttpGet("Promedio/{Numero1:int}/{Numero2:int}/{Numero3:int}")]
        public IActionResult Promedio(int Numero1, int Numero2, int Numero3)
        {
            double promedio = (Numero1 + Numero2 + Numero3) / 3.0;
            return Ok($"El promedio de las tres calificaciones es {promedio:0.##}");
        }

        // 7. Cuadrado de un número.
        [HttpGet("Cuadrado/{Numero:int}")]
        public IActionResult Cuadrado(int Numero)
        {
            return Ok($"El cuadrado de {Numero} es {Numero * Numero}");
        }

        // 8. Área del cuadrado.
        [HttpGet("AreaCuadrado/{Numero:int}")]
        public IActionResult AreaCuadrado(int Numero)
        {
            return Ok($"El área del cuadrado de {Numero} es {Numero * Numero}");
        }

        // 9. Perímetro de un cuadrado.
        [HttpGet("PerimetroCuadrado/{Numero:int}")]
        public IActionResult PerimetroCuadrado(int Numero)
        {
            return Ok($"El perímetro del cuadrado de {Numero} es {Numero * 4}");
        }

        // 10. Área de un círculo.
        [HttpGet("AreaCirculo/{Numero:int}")]
        public IActionResult AreaCirculo(int Numero)
        {
            return Ok($"El área del círculo de {Numero} es {Numero * Numero * 3.1416}");
        }

        // 11. Perímetro de un círculo.
        [HttpGet("PerimetroCirculo/{Numero:int}")]
        public IActionResult PerimetroCirculo(int Numero)
        {
            return Ok($"El perímetro del círculo de {Numero} es {Numero * 3.1416}");
        }

        // 12. Área del rectángulo.
        [HttpGet("AreaRectangulo/{Numero1:int}/{Numero2:int}")]
        public IActionResult AreaRectangulo(int Numero1, int Numero2)
        {
            return Ok($"El área del rectángulo de {Numero1} y {Numero2} es {Numero1 * Numero2}");
        }

        // 13. Área de un triángulo.
        [HttpGet("AreaTriangulo/{Numero1:int}/{Numero2:int}")]
        public IActionResult AreaTriangulo(int Numero1, int Numero2)
        {
            return Ok($"El área del triángulo de {Numero1} y {Numero2} es {Numero1 * Numero2 / 2}");
        }

        // 14. Porcentaje de una cantidad.
        [HttpGet("Porcentaje/{Numero1:int}/{Numero2:int}")]
        public IActionResult Porcentaje(int Numero1, int Numero2)
        {
            return Ok($"El porcentaje de {Numero1} sobre {Numero2} es {Numero1 * Numero2 / 100}");
        }

        // Suma colección.
        [HttpPost("SumaColeccion")]
        public IActionResult SumaColeccion(List<int> Numeros)
        {
            int suma = Numeros.Sum();
            return Ok($"La suma de los números es {suma}");
        
        }

        // Cuántos pares existen en la colección dinámica.
        [HttpPost("ParesColeccion")]
        public IActionResult ParesColeccion(List<int> Numeros)
        {
            int pares = Numeros.Count(x => x % 2 == 0);
            return Ok($"La cantidad de pares es {pares}");
        }

        // Calificaciones dinámicas (n cantidad) y promediará. si el promedio es 70 aprobará, si es menor alumno reprobado.
        [HttpPost("PromedioCalificaciones")]
        public IActionResult PromedioCalificaciones([FromBody] List<int> Calificaciones)
        {
            double promedio = Calificaciones.Average();
            string resultado = promedio >= 70 ? "aprobado" : "reprobado";

            return Ok($"El promedio es {promedio:0.##}. El alumno está {resultado}.");
        }

        // Elementos dinámicos, "A4C7X" "D4XS2" "FCSS4"
        // Cuántos números hay en total en todos los elementos
        [HttpPost("ContarNumerosElementos")]
        public IActionResult ContarNumerosElementos([FromBody] List<string> elementos)
        {
            // 1. Juntamos toda la lista en un solo texto gigante, sin espacios
            string textoUnido = string.Join("", elementos);
            
            // 2. Contamos los dígitos de ese texto gigante
            int totalNumeros = textoUnido.Count(char.IsDigit);

            return Ok($"El total de números en los elementos es {totalNumeros}.");
        }

        // 15. Evaluar si un valor es vocal o no.
        [HttpGet("EsVocal/{valor}")]
        public IActionResult EsVocal(string valor)
        {
            // Convertimos el valor a minúsculas.
            string minuscula = valor.ToLower();

            // Comparamos si el valor exacto es una de las 5 vocales
            if (minuscula == "a" || minuscula == "e" || minuscula == "i" || minuscula == "o" || minuscula == "u")
            {
                return Ok($"El valor '{valor}' SÍ es una vocal.");
            }
            
            // Si meten un "8", un "#" o la palabra "Hola", caerá directo aquí:
            return Ok($"El valor '{valor}' NO es una vocal.");
        }

        // Realizar un endpoint que permita evaluar si en una cadena de texto se encuentra ya sea un ("*", "/", "-"). Si en caso de no encontrar los elementos mencionados, deberá regresar un "OK" como respuesta, de lo contrario, indicar que la cadena presenta valores inválidos. Ejemplo: "ABDHJF-*" <- Presenta valores inválidos.
        [HttpPost("ValidarCadena2")]
        public IActionResult ValidarCadena2([FromBody] string texto)
        {
            if (texto.Contains("*") || texto.Contains("?") || texto.Contains("%"))
            {
                return Ok("La cadena presenta valores inválidos");
            }
            return Ok("OK");
        }
    }
}