package com.rickmortyapp.domain.usecase

import com.rickmortyapp.data.local.CharactersDatabase
import com.rickmortyapp.data.local.model.CharacterEntity
import javax.inject.Inject

class DislikeCharacterUseCase @Inject constructor(private val database: CharactersDatabase) {
    suspend fun execute(id: Int) {
        return database.dao.upsert(CharacterEntity(false, id))
    }
}