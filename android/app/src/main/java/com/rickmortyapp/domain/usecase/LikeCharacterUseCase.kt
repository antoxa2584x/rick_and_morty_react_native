package com.rickmortyapp.domain.usecase

import com.rickmortyapp.domain.repository.ICharacterRepository
import javax.inject.Inject

class LikeCharacterUseCase @Inject constructor(private val repository: ICharacterRepository) {
    suspend fun execute(id: Int) = repository.likedCharacter(id)
}