package com.docanalyser.pagerankcoocc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.docanalyser.pagerankcoocc.TermDistanceEntry;

import java.util.Arrays;
import java.util.List;

@RestController
public class TermDistanceEntryController {

    @GetMapping("/termdistances")
    public List<TermDistanceEntry> getTermDistances() {
        return Arrays.asList(
            new TermDistanceEntry(0, 1, 2.5f),
            new TermDistanceEntry(1, 2, 1.8f)
        );
    }
}
