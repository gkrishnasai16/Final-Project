package com.docanalyser.pagerankcoocc.controller;

import com.docanalyser.pagerankcoocc.service.FileConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

// Response class for structured responses
class FileConverterResponse {
    private String message;
    private String data; // Can hold the converted text if successful

    public FileConverterResponse(String message, String data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}

@RestController
@RequestMapping("/api/file-converter")
public class FileConverterController {

    private final FileConverter fileConverter;

    @Autowired
    public FileConverterController(FileConverter fileConverter) {
        this.fileConverter = fileConverter;
    }

    @PostMapping("/convert")
    public ResponseEntity<FileConverterResponse> convertFile(@RequestParam("file") MultipartFile file) {
        try {
            // Create a temporary file
            File tempFile = File.createTempFile("uploaded-", file.getOriginalFilename());
            Files.copy(file.getInputStream(), tempFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            String result = fileConverter.convertFile(tempFile);
            // Delete the temporary file after processing
            tempFile.deleteOnExit();

            if (result == null) {
                return ResponseEntity.badRequest().body(new FileConverterResponse("Error converting file", null));
            }
            return ResponseEntity.ok(new FileConverterResponse("Conversion successful", result));
        } catch (IOException e) {
            return ResponseEntity.status(500).body(new FileConverterResponse("Internal Server Error: " + e.getMessage(), null));
        }
    }
}
