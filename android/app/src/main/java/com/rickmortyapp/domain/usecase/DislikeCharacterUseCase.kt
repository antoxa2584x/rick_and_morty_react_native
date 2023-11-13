package com.rickmortyapp.domain.usecase

import com.rickmortyapp.domain.repository.ICharacterRepository
import javax.inject.Inject

class DislikeCharacterUseCase @Inject constructor(private val repository: ICharacterRepository) {
    suspend fun execute(id: Int) = repository.disLikedCharacter(id)
}