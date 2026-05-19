using Microsoft.AspNetCore.Mvc;

namespace SeguimientoTramites.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EjerciciosAll : ControllerBase
    {
        //? 1. Procedimiento o función para obtener el mínimo y máximo de una colección de valores. {7, 9, 10, 11, 12}
        //* Ejercicio 1 | Función.
        private (int Min, int Max) FnGetMinMax(List<int> list)
        {
            int Min = list[0];
            int Max = list[0];

            foreach (int n in list)
            {
                if (n < Min) Min = n;
                if (n > Max) Max = n;
            }

            return (Min, Max);
        }

        [HttpPost("MinMax")]
        public IActionResult MinMax([FromBody] List<int> list)
        {
            var resultado = FnGetMinMax(list);
            return Ok(resultado);
        }

        //* Ejercicio 1 | Procedimiento.
        private void PcGetMinMax(List<int> list, out int min, out int max)
        {
            min = list[0];
            max = list[0];

            foreach (int n in list)
            {
                if (n < min) min = n;
                if (n > max) max = n;
            }
        }

        [HttpPost("GetMinMaxPc")]
        public IActionResult GetMinMaxPc([FromBody] List<int> list)
        {
            PcGetMinMax(list, out int Min, out int Max);
            return Ok(new { Min, Max });
        }


        //? 2. {'1AE75', '4XL92', ...} Mínimo y máximo. En ese ejemplo es: Min: 1, Max: 9.
        //* Ejercicio 2 | Función.
        private (int min, int max) FnGetMinMaxInString(List<string> list)
        {
            int min = int.MaxValue;
            int max = int.MinValue;

            foreach (string text in list)
            {
                foreach (char i in text)
                {
                    if (char.IsDigit(i))
                    {
                        int n = i - '0';
                        if (n < min) min = n;
                        if (n > max) max = n;
                    }
                }

                if (min == int.MaxValue)
                {
                    min = 0;
                    max = 0;
                }
            }
            return (min, max);
        }

        [HttpPost("GetMinMaxInString")]
        public IActionResult GetMinMaxInString(List<string> list)
        {
            var resultado = FnGetMinMaxInString(list);
            return Ok(new { resultado.min, resultado.max });
        }

        //* Ejercicio 2 | Procedimiento.
        private void PcGetMinMaxInString(List<string> list, out int min, out int max)
        {
            min = int.MaxValue;
            max = int.MinValue;
            foreach (string text in list)
            {
                foreach (char i in text)
                {
                    if (char.IsDigit(i))
                    {
                        int n = i - '0';
                        if (n < min) min = n;
                        if (n > max) max = n;
                    }
                }
            }
            if (min == int.MaxValue)
            {
                min = 0;
                max = 0;
            }
        }

        [HttpPost("MinMaxInStringPc")]
        public IActionResult MinMaxInStringPc([FromBody] List<string> list)
        {
            PcGetMinMaxInString(list, out int min, out int max);
            return Ok(new { min, max });
        }


        //? 3. {'1AE75', '4XL92', ...} Ordenado de letras alfabéticamente y números de menor a mayor. Con procedimiento o función.
        //* Ejercicio 3 | Función.
        private (string Letters, string Numbers) FnGetNumAndTextOrder(List<string> list)
        {
            List<char> Letters = new List<char>();
            List<char> Numbers = new List<char>();

            foreach (var element in list)
            {
                foreach (char i in element)
                {
                    if (char.IsLetter(i)) Letters.Add(i);
                    else if (char.IsDigit(i)) Numbers.Add(i);
                }
            }
            Letters.Sort();
            Numbers.Sort();
            return (string.Concat(Letters), string.Concat(Numbers));
        }

        [HttpPost("NumbAndTextOrder")]
        public IActionResult NumbAndTextOrder([FromBody] List<string> list)
        {
            var resultado = FnGetNumAndTextOrder(list);
            return Ok(new { resultado.Letters, resultado.Numbers });
        }

        //* Ejercicio 3 | Procedimiento.
        private void PcGetNumAndTextOrder(List<string> list, out string LettersOrder, out string NumbersOrder)
        {
            List<char> Letters = new List<char>();
            List<char> Numbers = new List<char>();

            foreach (string element in list)
            {
                foreach (char i in element)
                {
                    if (char.IsLetter(i)) Letters.Add(i);
                    else if (char.IsDigit(i)) Numbers.Add(i);
                }
            }

            Letters.Sort();
            Numbers.Sort();

            LettersOrder = string.Concat(Letters);
            NumbersOrder = string.Concat(Numbers);
        }

        [HttpPost("NumAndTextOrderPc")]
        public IActionResult NumAndTextOrderPc([FromBody] List<string> list)
        {
            PcGetNumAndTextOrder(list, out string LetterOrder, out string NumbersOrder);
            return Ok(new { LetterOrder, NumbersOrder });
        }
    }
}