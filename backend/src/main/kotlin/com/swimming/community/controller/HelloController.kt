package com.swimming.community.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/hello")
class HelloController {
    @GetMapping
    fun hello(): String = "Hello, Swimming Community!"
} 