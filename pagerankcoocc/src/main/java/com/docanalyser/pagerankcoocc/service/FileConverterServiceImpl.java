package com.docanalyser.pagerankcoocc.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.sax.BodyContentHandler;
import org.jsoup.Jsoup;

import java.io.*;

@Service
public class FileConverterServiceImpl implements FileConverter {

    private final Logger logger = LoggerFactory.getLogger(FileConverterServiceImpl.class);

    @Override
    public String convertFile(File file) {
        String mimetype = getMimeType(file);

        if (mimetype == null) {
            logger.error("Mimetype not available for file: " + file.getName());
            return null;
        }

        logger.info("Mimetype: " + mimetype);

        switch (mimetype) {
            case "application/pdf":
                return convertPdfToText(file);
            case "text/html":
                return convertHtmlToText(file);
            case "text/plain":
                return convertTextFileToString(file);
            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": // For .docx
                return convertWordToText(file);
            default:
                logger.warn("Unsupported mime type: " + mimetype);
                return null;
        }
    }

    private String convertPdfToText(File file) {
        try (PDDocument document = PDDocument.load(file)) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            return pdfStripper.getText(document);
        } catch (IOException e) {
            logger.error("Error while converting PDF to text", e);
            return null;
        }
    }

    private String convertHtmlToText(File file) {
        try {
            String htmlContent = new String(java.nio.file.Files.readAllBytes(file.toPath()));
            return Jsoup.parse(htmlContent).text();
        } catch (IOException e) {
            logger.error("Error while extracting HTML to text", e);
            return null;
        }
    }

    private String convertTextFileToString(File file) {
        try {
            return new String(java.nio.file.Files.readAllBytes(file.toPath()));
        } catch (IOException e) {
            logger.error("Error while reading text file", e);
            return null;
        }
    }

    private String convertWordToText(File file) {
        try (InputStream input = new FileInputStream(file)) {
            BodyContentHandler handler = new BodyContentHandler();
            Metadata metadata = new Metadata();
            AutoDetectParser parser = new AutoDetectParser();
            parser.parse(input, handler, metadata);
            return handler.toString();
        } catch (Exception e) {
            logger.error("Error while converting Word file to text", e);
            return null;
        }
    }

    private String getMimeType(File file) {
        try (InputStream input = new FileInputStream(file)) {
            BodyContentHandler handler = new BodyContentHandler();
            Metadata metadata = new Metadata();
            AutoDetectParser parser = new AutoDetectParser();
            parser.parse(input, handler, metadata);
            return metadata.get("Content-Type");
        } catch (Exception e) {
            logger.error("Error while detecting file mime type", e);
            return null;
        }
    }
}
