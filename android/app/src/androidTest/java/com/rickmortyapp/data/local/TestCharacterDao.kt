package com.rickmortyapp.data.local

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.test.filters.SmallTest
import com.google.common.truth.Truth.assertThat
import com.rickmortyapp.TEST_DB_NAME
import com.rickmortyapp.data.local.model.CharacterEntity
import dagger.hilt.android.testing.HiltAndroidRule
import dagger.hilt.android.testing.HiltAndroidTest
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import org.junit.After
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import javax.inject.Inject
import javax.inject.Named

@ExperimentalCoroutinesApi
@HiltAndroidTest
@SmallTest
class TestCharacterDao {

    @get:Rule
    var hiltRule = HiltAndroidRule(this)

    @get:Rule
    var instantTaskExecutorRule = InstantTaskExecutorRule()

    @Inject
    @Named(TEST_DB_NAME)
    lateinit var database: CharactersDatabase
    private lateinit var charactersDao: CharactersDao

    @Before
    fun setup() {
        hiltRule.inject()
        charactersDao = database.dao
    }

    @After
    fun tearDown() {
        database.close()
    }

    @Test
    fun insertLiked() = runTest {
        val id = 666
        val character = CharacterEntity(
            id = id, isLiked = true
        )
        charactersDao.upsert(character)
        val characterEntity = charactersDao.getCharacter(id)

        assertThat(characterEntity).isNotNull()
        assertThat(characterEntity).isEqualTo(character)
        assertThat(characterEntity?.isLiked).isEqualTo(true)

    }

    @Test
    fun insertDisliked() = runTest {
        val id = 666
        val character = CharacterEntity(
            id = id, isLiked = false
        )
        charactersDao.upsert(character)
        val characterEntity = charactersDao.getCharacter(id)

        assertThat(characterEntity).isNotNull()
        assertThat(characterEntity).isEqualTo(character)
        assertThat(characterEntity?.isLiked).isEqualTo(false)

    }

    @Test
    fun getNullCharacter() = runTest {
        val characterEntity = charactersDao.getCharacter(666)

        assertThat(characterEntity).isNull()
    }
}