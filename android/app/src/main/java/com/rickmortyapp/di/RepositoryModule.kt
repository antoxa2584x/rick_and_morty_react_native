package com.rickmortyapp.di

import android.content.Context
import androidx.room.Room
import com.rickmortyapp.data.local.CharacterRepositoryImpl
import com.rickmortyapp.data.local.CharactersDatabase
import com.rickmortyapp.domain.repository.ICharacterRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton


@InstallIn(SingletonComponent::class)
@Module
class RepositoryModule {
    @Provides
    @Singleton
    fun provideCharactersDatabase(@ApplicationContext context: Context): CharactersDatabase {
        return Room.databaseBuilder(
            context,
            CharactersDatabase::class.java,
            "characters.db"
        ).build()
    }

    @Singleton
    @Provides
    fun provideCharacterRepository(
        database: CharactersDatabase,
    ): ICharacterRepository {
        return CharacterRepositoryImpl(database)
    }
}