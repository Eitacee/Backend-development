# Assignment 2: PostgreSQL JSONB In-Depth Analysis

- **Name:** Prince Kandari
- **SAP ID:** 590014595
- **Course:** Backend Development (B.Tech Full Stack)

---

## 📋 Overview
This research paper provides a comprehensive theoretical and practical analysis of **`JSONB` in PostgreSQL**, contrasting hybrid relational/NoSQL architectures against pure document databases (e.g., MongoDB).

## 📄 Main Document
The full report is available in **[`Assignment2.md`](./Assignment2.md)**.

## 🔬 Topics Covered
1. **JSON vs JSONB**: Storage formats, parsing overhead, and binary indexability.
2. **Indexing Strategies**: GIN (Generalized Inverted Index) and jsonb_path_ops.
3. **Query Operators**: Field extraction (`->`, `->>`), existence checks (`?`, `?&`), and containment queries (`@>`).
4. **Performance Benchmark**: Query execution times and index disk footprints.
