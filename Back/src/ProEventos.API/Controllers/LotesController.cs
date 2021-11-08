﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Domain;
using ProEventos.Application.Contratos;
using Microsoft.AspNetCore.Http;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LotesController : ControllerBase
    {
        private readonly ILoteService _loteService;

        public LotesController(ILoteService loteService)
        {
            _loteService = loteService;
        }

        [HttpGet("{eventoId}")]
        public async Task<IActionResult> Get(int eventoId)
        {
            try
            {
                var lotes = await _loteService.GetLotesByEventosIdAsync(eventoId);
                if (lotes == null)
                {
                    return NoContent();
                }

                return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar os lotes! Erro:{ex.Message}");
            }
        }

        [HttpPut("{eventoId}")]
        public async Task<IActionResult> SalvarLotes(int eventoId, LoteDto[] models)
        {
            try
            {
                var lotes = await _loteService.SalvarLotes(eventoId, models);
                if (lotes == null)
                {
                    return NoContent();
                }
                return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar salvar lotes! Erro:{ex.Message}");
            }
        }

        [HttpDelete("{eventoId}/{loteId}")]
        public async Task<IActionResult> Delete(int eventoId, int loteId)
        {
            try
            {
                var lote = await _loteService.GetLoteByIdsAsync(eventoId, loteId);
                if (lote == null)
                {
                    return NoContent();
                }

                return await _loteService.DeleteLote(lote.EventoId, lote.Id)
                ? Ok(new {message = "Lote Deletado!"})
                : throw new Exception("Ocorreu um problema especifico ao tentar deletar o lote!");

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar deletar o lote! Erro:{ex.Message}");
            }
        }
    }
}
