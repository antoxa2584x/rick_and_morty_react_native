package com.rickmortyapp.data.local

import androidx.room.Dao
import androidx.room.Query
import androidx.room.Upsert
import com.rickmortyapp.data.local.model.CharacterEntity

@Dao
interface CharactersDao {

    @Upsert
    suspend fun upsert(likedEntity: CharacterEntity)

    @Query("SELECT * FROM characterentity WHERE id = :id ")
    suspend fun isLiked(id: Int): CharacterEntity?
}