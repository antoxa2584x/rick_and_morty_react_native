package com.rickmortyapp.domain.repository

import com.rickmortyapp.domain.model.CharacterPojo

interface ICharacterRepository {
   suspend fun likedCharacter(id:Int)
   suspend fun disLikedCharacter(id:Int)
   suspend fun getCharacter(id:Int):CharacterPojo?
}