using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;

namespace SeguimientoTramites.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EjerciciosExamenFinal : ControllerBase
    {
        // 1. Procedimiento o función para obtener el mínimo y máximo de una colección de valores. {7, 9, 10, 11, 12}
        // La función que procesa la lógica
        private object ObtenerMinMax(List<int> numeros)
        {
            return new
            {
                Minimo = numeros.Min(),
                Maximo = numeros.Max()
            };
        }

        [HttpPost("MinimoMaximo")]
        public IActionResult MinimoMaximo([FromBody] List<int> Numeros)
        {
            var resultado = ObtenerMinMax(Numeros);
            return Ok(resultado);
        }

        // 2. {'1AE75', '4XL92', ...} Mínimo y máximo. En ese ejemplo es: Min: 1, Max: 9.
        [HttpPost("MinMaxFuncion")]
        public IActionResult MinMaxFuncion([FromBody] List<string> lista)
        {
            int min = int.MaxValue;
            int max = int.MinValue;

            foreach (var texto in lista)
            {
                foreach (char c in texto)
                {
                    if (char.IsDigit(c))
                    {
                        int n = (int)char.GetNumericValue(c);
                        if (n < min) min = n;
                        if (n > max) max = n;
                    }
                }
            }
            return Ok($"Min: {min}, Max: {max}");
        }

        // 3. {'1AE75', '4XL92', ...} Ordenado de letras alfabéticamente y números de menor a mayor. Con procedimiento o función.
        [HttpPost("LetrasYNumerosOrdenados")]
        public IActionResult LetrasYNumerosOrdenados([FromBody] List<string> lista)
        {
            List<char> letras = new List<char>();
            List<char> numeros = new List<char>();

            foreach (var texto in lista)
            {
                foreach (char c in texto)
                {
                    if (char.IsLetter(c)) letras.Add(c);
                    if (char.IsDigit(c)) numeros.Add(c);
                }
            }

            letras.Sort();
            string letrasOrdenadas = string.Concat(letras);

            numeros.Sort();
            string numerosOrdenados = string.Concat(numeros);

            return Ok($"Letras: {letrasOrdenadas}, Numero: {numerosOrdenados}");
        }
    }
}