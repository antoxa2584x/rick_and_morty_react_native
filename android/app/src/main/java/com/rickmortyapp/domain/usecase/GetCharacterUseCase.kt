package com.rickmortyapp.domain.usecase

import com.rickmortyapp.data.local.CharactersDatabase
import com.rickmortyapp.data.local.model.CharacterEntity
import javax.inject.Inject

class GetCharacterUseCase @Inject constructor(private val database: CharactersDatabase) {
    suspend fun execute(id: Int): CharacterEntity? {
        return database.dao.isLiked(id)
    }
}