package com.docanalyser.pagerankcoocc.service;

import java.io.*;
import java.text.BreakIterator;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class TextProcessorService {

    private HashSet<String> abbreviations;
    private Locale language;
    private String database;
    private String htmlConverter;
    private String dbConnectionName;
    private String workingDir;
    private boolean keepNewline;
    private boolean wrapLongLines;
    private boolean rawMode;

    public TextProcessorService() {
        this.abbreviations = new HashSet<>();
        this.language = Locale.ENGLISH; // Default to English
        this.keepNewline = false;
        this.wrapLongLines = false;
        this.rawMode = false;
    }

    // Set various processing options
    public void setOptions(String database, String htmlConverter, String dbConnectionName, String workingDir) {
        this.database = database;
        this.htmlConverter = htmlConverter;
        this.dbConnectionName = dbConnectionName;
        this.workingDir = workingDir;
    }

    public void setLanguage(Locale language) {
        this.language = language;
    }

    public void setKeepNewline(boolean keepNewline) {
        this.keepNewline = keepNewline;
    }

    public void setWrapLongLines(boolean wrapLongLines) {
        this.wrapLongLines = wrapLongLines;
    }

    public void setRawMode(boolean rawMode) {
        this.rawMode = rawMode;
    }

    // Core sentence segmentation logic based on the BreakIterator
    public String segmentTextToSentences(String inputText) {
        StringBuilder result = new StringBuilder();
        BreakIterator boundary = BreakIterator.getSentenceInstance(language);
        boundary.setText(inputText);
        int start = boundary.first();
        for (int end = boundary.next(); end != BreakIterator.DONE; start = end, end = boundary.next()) {
            String sentence = inputText.substring(start, end);
            result.append(sentence.trim()).append("\n");
        }

        // Handling line breaks
        if (keepNewline) {
            result.append("\n");
        }

        // Wrapping long lines
        if (wrapLongLines && result.length() > 220) {
            result.insert(220, "\n");
        }

        return result.toString();
    }

    // Process a file for sentence segmentation
    public String processFile(File inputFile) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(inputFile));
        StringBuilder content = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            content.append(line).append("\n");
        }
        reader.close();
        return segmentTextToSentences(content.toString());
    }

    // Method to handle abbreviations (assuming it could be an external file or database)
    public void loadAbbreviations(File abbreviationFile) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(abbreviationFile));
        String line;
        while ((line = reader.readLine()) != null) {
            abbreviations.add(line.trim());
        }
        reader.close();
    }

    // Simulate HTML to text conversion (assuming it's external or internal tool)
    public String convertHtmlToText(String htmlContent) {
        // Placeholder for actual HTML to text conversion logic (e.g., using jsoup or another library)
        return htmlContent.replaceAll("<[^>]+>", ""); // Removes basic HTML tags
    }

    // Placeholder for database operations (not implemented)
    public void saveToDatabase(String data) {
        // Add code to connect and save processed data to the database using dbConnectionName
        // Not implemented in this example
    }

    // Extract keywords from a single document based on TF-IDF (term frequency-inverse document frequency)
    public List<String> extractKeywordsUsingTFIDF(String documentText) {
        Map<String, Double> tfidfScores = new HashMap<>();

        // Calculate term frequency for the document
        Map<String, Integer> termFreq = new HashMap<>();
        String[] words = documentText.split("\\W+");
        for (String word : words) {
            termFreq.put(word.toLowerCase(), termFreq.getOrDefault(word.toLowerCase(), 0) + 1);
        }

        int totalTerms = words.length;

        // Calculate TF-IDF score for each term
        for (Map.Entry<String, Integer> entry : termFreq.entrySet()) {
            String term = entry.getKey();
            int freq = entry.getValue();

            // TF: Term Frequency
            double tf = (double) freq / totalTerms;

            // IDF: Simplified to 1 for a single document (or adjust if more context available)
            double idf = Math.log(1 + totalTerms);

            // TF-IDF
            double tfidf = tf * idf;
            tfidfScores.put(term, tfidf);
        }

        // Sort by score in descending order and select top keywords
        return tfidfScores.entrySet().stream()
                .sorted((e1, e2) -> Double.compare(e2.getValue(), e1.getValue()))
                .limit(10) // Limiting to top 10 keywords
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }
}
