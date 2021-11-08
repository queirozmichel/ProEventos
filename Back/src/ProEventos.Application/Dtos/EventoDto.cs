using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public DateTime DataEvento { get; set; } //O ? significa que pode ser NULO

        [Required(ErrorMessage = "{0} é obrigatório!")]
        [MinLength(3, ErrorMessage = "{0} deve conter no mínimo 3 caracteres!")]
        [MaxLength(50, ErrorMessage = "{0} deve conter no máximo 50 caracteres!")]
        public string Tema { get; set; }

        [Display(Name = "Qtd Pessoas")]
        [Range(1,120000,ErrorMessage ="A {0} deve ser maior que 1 e menor que 120000")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|png|bmp)$",ErrorMessage ="Não é uma imagem válida!(gif|jpeg|jpg|png|bmp)")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "{0} é obrigatório!")]
        [Phone(ErrorMessage ="{0} contém um ou mais caracteres inválidos!")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "{0} é obrigatório!")]
        [Display(Name = "e-mail")]
        [EmailAddress(ErrorMessage = "{0} precisa ter um endereço válido!")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }

    }
}