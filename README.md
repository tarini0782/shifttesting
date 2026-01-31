# SwiftTranslator Automated Test Suite Documentation

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Prerequisites](#prerequisites)  
3. [Installation](#installation)  
4. [Configuration](#configuration)  
5. [Test Data](#test-data)  
   - [Positive Functional Tests](#positive-functional-tests)  
   - [Negative Functional Tests](#negative-functional-tests)  
   - [UI Functionality Tests](#ui-functionality-tests)  
6. [Page Object Model](#page-object-model)  
7. [Test Suite Structure](#test-suite-structure)  
8. [Running the Tests](#running-the-tests)  
9. [Example Test Case Execution](#example-test-case-execution)  
10. [Timeouts and Delays](#timeouts-and-delays)  

---

## Project Overview

The **SwiftTranslator Automated Test Suite** is designed to validate the **Singlish to Sinhala translation** functionality on [SwiftTranslator](https://www.swifttranslator.com/) using **Playwright**.  

It covers:  
- Functional validation of translation for **positive and negative scenarios**  
- UI verification including **real-time translation updates**  

The test suite follows the **Page Object Model (POM)** pattern for reusability and maintainability.

---

## Prerequisites

- Node.js >= 18  
- npm or yarn  
- Playwright installed  

---

## Installation

1. Clone the repository:

```bash
git clone <repo_url>
cd <repo_folder>
