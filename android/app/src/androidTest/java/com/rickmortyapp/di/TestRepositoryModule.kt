package com.rickmortyapp.di

import android.content.Context
import androidx.room.Room
import com.rickmortyapp.TEST_DB_NAME
import com.rickmortyapp.TEST_REPO_NAME
import com.rickmortyapp.data.local.CharacterRepositoryImpl
import com.rickmortyapp.data.local.CharactersDatabase
import com.rickmortyapp.domain.repository.ICharacterRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Named

@Module
@InstallIn(SingletonComponent::class)
object TestRepositoryModule {

    @Provides
    @Named(TEST_DB_NAME)
    fun provideTestCharactersDatabase(@ApplicationContext context: Context) =
        Room.inMemoryDatabaseBuilder(
            context, CharactersDatabase::class.java
        ).allowMainThreadQueries()
            .build()

    @Provides
    @Named(TEST_REPO_NAME)
    fun provideTestCharacterRepository(
        @Named(TEST_DB_NAME)
        database: CharactersDatabase,
    ): ICharacterRepository {
        return CharacterRepositoryImpl(database)
    }
}