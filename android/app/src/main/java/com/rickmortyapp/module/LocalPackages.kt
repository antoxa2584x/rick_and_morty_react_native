package com.rickmortyapp.module

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.rickmortyapp.module.database.DatabaseModule

class LocalPackages(private val databaseModule: DatabaseModule) : ReactPackage {
    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): List<NativeModule> {
        val modules: MutableList<NativeModule> = ArrayList()
        modules.add(databaseModule)
        return modules
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}