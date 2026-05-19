using Microsoft.AspNetCore.Mvc;

namespace SeguimientoTramites.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Evidencia1 : ControllerBase
    {
        // 3. Sumar
        [HttpGet("Sumar/{Numero1:int}/{Numero2:int}")]
        public IActionResult Sumar(int Numero1, int Numero2)
        {
            return Ok($"La suma de {Numero1} y {Numero2} es {Numero1 + Numero2}");
        }

        // 4. Restar.
        [HttpGet("Restar/{Numero1:int}/{Numero2:int}")]
        public IActionResult Restar(int Numero1, int Numero2)
        {
            return Ok($"La resta de {Numero1} - {Numero2} es {Numero1 - Numero2}");
        }

        // 5. Multiplicar.
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

        // 15 Realizar un programa que convierta de dólares a pesos.
        [HttpGet("DolaresAPesos/{cantidad:double}")]
        public IActionResult DolaresAPesos(double cantidad)
        {
            double valorDolarEnPesos = 18.0;
            return Ok($"{cantidad} dólares son {cantidad * valorDolarEnPesos} pesos.");
        }
        // 16. Realizar un programa que convierta de dólares a euros.
        [HttpGet("DolaresAEuros/{cantidad:double}")]
        public IActionResult DolaresAEuros(double cantidad)
        {
            double valorDolarEnEuros = 0.86;
            return Ok($"{cantidad} dólares son {cantidad * valorDolarEnEuros} euros.");
        }
        // 17. Realizar un programa que convierta de pesos a dólares.
        [HttpGet("PesosADolares/{cantidad:double}")]
        public IActionResult PesosADolares(double cantidad)
        {
            double valorDolarEnPesos = 18.0;
            return Ok($"{cantidad} pesos son {cantidad / valorDolarEnPesos} dólares.");
        }
        // 18. Realizar un programa que convierta de pesos a euros.
        [HttpGet("PesosAEuros/{cantidad:double}")]
        public IActionResult PesosAEuros(double cantidad)
        {
            double valorEuroEnPesos = 20.2;
            return Ok($"{cantidad} pesos son {cantidad / valorEuroEnPesos} euros.");
        }

        // 19. Realizar un programa que convierta de euros a pesos.
        [HttpGet("EurosAPesos/{cantidad:double}")]
        public IActionResult EurosAPesos(double cantidad)
        {
            double valorEuroEnPesos = 20.2;
            return Ok($"{cantidad} euros son {cantidad * valorEuroEnPesos} pesos.");
        }

        // 20. Realizar un programa que convierta de euros a dólares.
        [HttpGet("EurosADolares/{cantidad:double}")]
        public IActionResult EurosADolares(double cantidad)
        {
            double valorDolarEnEuros = 0.86;
            return Ok($"{cantidad} euros son {cantidad / valorDolarEnEuros} dólares.");
        }
    }
}