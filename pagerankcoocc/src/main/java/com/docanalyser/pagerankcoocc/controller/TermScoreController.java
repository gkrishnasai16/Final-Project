package com.docanalyser.pagerankcoocc.controller;

import com.docanalyser.pagerankcoocc.TermScore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class TermScoreController {

    @GetMapping("/termscores")
    public List<TermScore> getTermScores() {
        return Arrays.asList(
            new TermScore("example", 0, 1.5f),
            new TermScore("sample", 1, 2.0f)
        );
    }
}