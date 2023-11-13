package com.rickmortyapp.module.database

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.rickmortyapp.domain.usecase.DislikeCharacterUseCase
import com.rickmortyapp.domain.usecase.GetCharacterUseCase
import com.rickmortyapp.domain.usecase.LikeCharacterUseCase
import kotlinx.coroutines.runBlocking
import javax.inject.Inject

class DatabaseModule @Inject constructor(
    private val getCharacterUseCase: GetCharacterUseCase,
    private val likeCharacterUseCase: LikeCharacterUseCase,
    private val dislikeCharacterUseCase: DislikeCharacterUseCase,
) :
    ReactContextBaseJavaModule() {

    override fun getName() = "DatabaseModule"

    @ReactMethod
    fun likeCharacter(id: Int, promise: Promise) {
        runBlocking {
            likeCharacterUseCase.execute(id)
            promise.resolve(true)
        }
    }

    @ReactMethod
    fun disLikeCharacter(id: Int, promise: Promise) {
        runBlocking {
            dislikeCharacterUseCase.execute(id)
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun getCharacterStatus(id: Int, promise: Promise) {
        runBlocking {
            val character = getCharacterUseCase.execute(id)
            promise.resolve(character?.isLiked == true)
        }
    }

}