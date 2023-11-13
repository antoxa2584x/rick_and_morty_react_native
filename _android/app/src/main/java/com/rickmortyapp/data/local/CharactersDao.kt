package com.rickmortyapp.data.local

import com.rickmortyapp.data.local.model.CharacterEntity

//@Dao
interface CharactersDao {

//    @Upsert
    suspend fun upsert(likedEntity: CharacterEntity)

//    @Query("SELECT * FROM characterentity WHERE id = :id ")
    suspend fun isLiked(id: Int): CharacterEntity?
}