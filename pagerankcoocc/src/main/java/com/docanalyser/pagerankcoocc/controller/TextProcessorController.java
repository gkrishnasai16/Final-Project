package com.docanalyser.pagerankcoocc.controller;

import com.docanalyser.pagerankcoocc.service.TextProcessorService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Locale;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/text-processor")
public class TextProcessorController {

    private final TextProcessorService textProcessorService;

    @Autowired
    public TextProcessorController(TextProcessorService textProcessorService) {
        this.textProcessorService = textProcessorService;
    }

    // Endpoint to process text input and segment it into sentences
    @PostMapping("/process")
    public ResponseEntity<String> processText(@RequestBody String inputText) {
        String result = textProcessorService.segmentTextToSentences(inputText);
        return ResponseEntity.ok(result);
    }

    // Endpoint to process a text file for sentence segmentation
    @PostMapping("/process-file")
    public ResponseEntity<String> processFile(@RequestParam("file") MultipartFile file) throws IOException {
        File tempFile = File.createTempFile("temp", ".txt");
        file.transferTo(tempFile);

        String result = textProcessorService.processFile(tempFile);
        tempFile.delete(); // Clean up the temporary file

        return ResponseEntity.ok(result);
    }

    // Endpoint to load abbreviations from a file
    @PostMapping("/load-abbreviations")
    public ResponseEntity<String> loadAbbreviations(@RequestParam("file") MultipartFile file) throws IOException {
        File tempFile = File.createTempFile("abbreviations", ".txt");
        file.transferTo(tempFile);

        textProcessorService.loadAbbreviations(tempFile);
        tempFile.delete(); // Clean up the temporary file

        return ResponseEntity.ok("Abbreviations loaded successfully");
    }

    // Endpoint to convert HTML to text
    @PostMapping("/convert-html")
    public ResponseEntity<String> convertHtmlToText(@RequestBody String htmlContent) {
        String result = textProcessorService.convertHtmlToText(htmlContent);
        return ResponseEntity.ok(result);
    }

    // Endpoint to save processed data to the database (simulated in the service)
    @PostMapping("/save-to-database")
    public ResponseEntity<String> saveToDatabase(@RequestBody String data) {
        textProcessorService.saveToDatabase(data);
        return ResponseEntity.ok("Data saved to database successfully");
    }

    // Endpoint to set various processing options
    @PostMapping("/set-options")
    public ResponseEntity<String> setOptions(
            @RequestParam("database") String database,
            @RequestParam("htmlConverter") String htmlConverter,
            @RequestParam("dbConnectionName") String dbConnectionName,
            @RequestParam("workingDir") String workingDir) {

        textProcessorService.setOptions(database, htmlConverter, dbConnectionName, workingDir);
        return ResponseEntity.ok("Options set successfully");
    }

    // Endpoint to set language for sentence segmentation
    @PostMapping("/set-language")
    public ResponseEntity<String> setLanguage(@RequestParam("language") String languageCode) {
        Locale language = new Locale(languageCode);
        textProcessorService.setLanguage(language);
        return ResponseEntity.ok("Language set to " + language.getDisplayName());
    }

    // Endpoint to set keepNewline option
    @PostMapping("/set-keep-newline")
    public ResponseEntity<String> setKeepNewline(@RequestParam("keepNewline") boolean keepNewline) {
        textProcessorService.setKeepNewline(keepNewline);
        return ResponseEntity.ok("Keep newline set to " + keepNewline);
    }

    // Endpoint to set wrapLongLines option
    @PostMapping("/set-wrap-long-lines")
    public ResponseEntity<String> setWrapLongLines(@RequestParam("wrapLongLines") boolean wrapLongLines) {
        textProcessorService.setWrapLongLines(wrapLongLines);
        return ResponseEntity.ok("Wrap long lines set to " + wrapLongLines);
    }

    // Endpoint to set rawMode option
    @PostMapping("/set-raw-mode")
    public ResponseEntity<String> setRawMode(@RequestParam("rawMode") boolean rawMode) {
        textProcessorService.setRawMode(rawMode);
        return ResponseEntity.ok("Raw mode set to " + rawMode);
    }

    // New endpoint to analyze content from a URL and extract main topics
    @PostMapping("/analyze-url")
    public ResponseEntity<List<String>> analyzeUrlContent(@RequestBody Map<String, String> request) {
        String url = request.get("url");

        if (url == null || url.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Return a 400 response if URL is missing
        }

        try {
            // Fetch HTML content from the URL
            Document document = Jsoup.connect(url).get();
            String textContent = document.body().text(); // Extract plain text content

            // Process content to get keywords
            List<String> keywords = textProcessorService.extractKeywordsUsingTFIDF(textContent);
            return ResponseEntity.ok(keywords);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null); // Handle errors gracefully
        }
    }
}
