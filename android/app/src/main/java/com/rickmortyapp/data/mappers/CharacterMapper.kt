package com.rickmortyapp.data.mappers

import com.rickmortyapp.data.local.model.CharacterEntity
import com.rickmortyapp.domain.model.CharacterPojo

fun CharacterEntity.toCharacter(): CharacterPojo {
    return CharacterPojo(isLiked = this.isLiked, id = this.id)
}