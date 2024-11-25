package com.docanalyser.pagerankcoocc;

import java.util.Objects;

public class TermScore implements Comparable<TermScore> {

    private String wordStr;
    private int index;
    private float sig;

    public TermScore(String w, int i, float s) {
        this.wordStr = w;
        this.index = i;
        this.sig = s;
    }

    @Override
    public String toString() {
        return String.format("%s, %d, %f", wordStr, index, sig);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TermScore)) {
            return false;
        }
        TermScore that = (TermScore) o;
        return wordStr.equals(that.getWordStr());
    }

    @Override
    public int compareTo(TermScore that) {
        return Float.compare(that.getSig(), this.sig); // Sort in descending order
    }

    @Override
    public int hashCode() {
        return Objects.hash(wordStr);
    }

    public String getWordStr() {
        return wordStr;
    }

    public int getIndex() {
        return index;
    }

    public float getSig() {
        return sig;
    }

    public void setSig(float s) {
        this.sig = s;
    }
}
