package com.rickmortyapp.di

import android.content.Context
import androidx.room.Room
import com.rickmortyapp.data.local.CharactersDatabase
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
    fun provideRepositoriesDatabase(@ApplicationContext context: Context): CharactersDatabase {
        return Room.databaseBuilder(
            context,
            CharactersDatabase::class.java,
            "characters.db"
        ).build()
    }
}