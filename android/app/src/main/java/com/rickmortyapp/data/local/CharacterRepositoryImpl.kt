package com.rickmortyapp.data.local

import com.rickmortyapp.data.local.model.CharacterEntity
import com.rickmortyapp.data.mappers.toCharacter
import com.rickmortyapp.domain.model.CharacterPojo
import com.rickmortyapp.domain.repository.ICharacterRepository
import javax.inject.Inject

class CharacterRepositoryImpl @Inject constructor(private val database: CharactersDatabase) :
    ICharacterRepository {
    override suspend fun likedCharacter(id: Int) {
        return database.dao.upsert(CharacterEntity(true, id))
    }

    override suspend fun disLikedCharacter(id: Int) {
        return database.dao.upsert(CharacterEntity(false, id))
    }

    override suspend fun getCharacter(id: Int): CharacterPojo? {
        val characterEntity = database.dao.isLiked(id)
        return characterEntity?.toCharacter()
    }
}