package com.docanalyser.pagerankcoocc;

public class TermDistanceEntry {

    private int index1;
    private int index2;
    private float distance;

    public TermDistanceEntry(int i, int j, float d) {
        this.index1 = i;
        this.index2 = j;
        this.distance = d;
    }

    @Override
    public String toString() {
        return String.format("Index1: %d, Index2: %d, Distance: %f", index1, index2, distance);
    }

    public int getIndex1() {
        return index1;
    }

    public int getIndex2() {
        return index2;
    }

    public float getDistance() {
        return distance;
    }
}
