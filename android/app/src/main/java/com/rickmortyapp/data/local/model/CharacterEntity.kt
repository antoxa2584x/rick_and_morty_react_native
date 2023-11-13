package com.rickmortyapp.data.local.model

import androidx.room.Entity
import androidx.room.PrimaryKey


@Entity
data class CharacterEntity(val isLiked: Boolean, @PrimaryKey val id: Int)
