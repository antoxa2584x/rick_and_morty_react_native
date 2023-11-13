package com.rickmortyapp.domain

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.test.filters.SmallTest
import com.google.common.truth.Truth
import com.rickmortyapp.TEST_DB_NAME
import com.rickmortyapp.TEST_REPO_NAME
import com.rickmortyapp.data.local.CharactersDatabase
import com.rickmortyapp.domain.repository.ICharacterRepository
import com.rickmortyapp.domain.usecase.DislikeCharacterUseCase
import com.rickmortyapp.domain.usecase.GetCharacterUseCase
import com.rickmortyapp.domain.usecase.LikeCharacterUseCase
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
class TestCharacterUseCases {
    @get:Rule
    var hiltRule = HiltAndroidRule(this)

    @get:Rule
    var instantTaskExecutorRule = InstantTaskExecutorRule()

    @Inject
    @Named(TEST_DB_NAME)
    lateinit var database: CharactersDatabase

    @Inject
    @Named(TEST_REPO_NAME)
    lateinit var iCharacterRepository: ICharacterRepository

    private lateinit var likeCharacterUseCase: LikeCharacterUseCase
    private lateinit var dislikeCharacterUseCase: DislikeCharacterUseCase
    private lateinit var getCharacterUseCase: GetCharacterUseCase

    @Before
    fun setup() {
        hiltRule.inject()
        likeCharacterUseCase = LikeCharacterUseCase(iCharacterRepository)
        dislikeCharacterUseCase = DislikeCharacterUseCase(iCharacterRepository)
        getCharacterUseCase = GetCharacterUseCase(iCharacterRepository)
    }

    @After
    fun tearDown() {
        database.close()
    }

    @Test
    fun likeUseCase() = runTest {
        val id = 666
        likeCharacterUseCase.execute(id)

        val characterEntity = getCharacterUseCase.execute(id)

        Truth.assertThat(characterEntity).isNotNull()
        Truth.assertThat(characterEntity?.isLiked).isEqualTo(true)
    }

    @Test
    fun dislikeUseCase() = runTest {
        val id = 666
        dislikeCharacterUseCase.execute(id)

        val characterEntity = getCharacterUseCase.execute(id)

        Truth.assertThat(characterEntity).isNotNull()
        Truth.assertThat(characterEntity?.isLiked).isEqualTo(false)
    }

    @Test
    fun getCharacterUseCase() = runTest {
        val id = 666
        val characterEntity = getCharacterUseCase.execute(id)

        Truth.assertThat(characterEntity).isNull()
    }
}