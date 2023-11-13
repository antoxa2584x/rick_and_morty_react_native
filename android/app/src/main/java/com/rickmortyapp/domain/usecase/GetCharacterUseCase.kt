package com.rickmortyapp.domain.usecase

import com.rickmortyapp.data.local.CharactersDatabase
import com.rickmortyapp.data.local.model.CharacterEntity
import com.rickmortyapp.domain.repository.ICharacterRepository
import javax.inject.Inject

class GetCharacterUseCase  @Inject constructor(private val repository: ICharacterRepository) {
    suspend fun execute(id: Int) = repository.getCharacter(id)
}