package com.rickmortyapp.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.rickmortyapp.data.local.model.CharacterEntity


@Database(
    entities = [CharacterEntity::class],
    version = 1,
    exportSchema = false
)
abstract class CharactersDatabase : RoomDatabase() {

    abstract val dao: CharactersDao
}