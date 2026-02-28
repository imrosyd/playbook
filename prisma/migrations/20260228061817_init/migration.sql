-- CreateTable
CREATE TABLE "Scenario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "domain" TEXT NOT NULL DEFAULT 'revenue',
    "description" TEXT NOT NULL DEFAULT '',
    "decision_timeframe" TEXT NOT NULL DEFAULT 'quarter',
    "data_spans_orders_of_magnitude" BOOLEAN NOT NULL DEFAULT false,
    "base_data" TEXT NOT NULL DEFAULT '[]',
    "preferred_chart_types" TEXT NOT NULL DEFAULT 'line,bar',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ExecutiveReaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "archetype" TEXT NOT NULL,
    "credibility_band" TEXT NOT NULL,
    "dominant_manipulation" TEXT NOT NULL DEFAULT 'general',
    "template_text" TEXT NOT NULL,
    "decision_tendency" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CognitivePrinciple" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "principle_key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "research_citation" TEXT NOT NULL DEFAULT '',
    "sort_order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "EthicalLevel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "example_text" TEXT NOT NULL DEFAULT '',
    "color_code" TEXT NOT NULL DEFAULT '#6B7280'
);

-- CreateTable
CREATE TABLE "UserLabSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "scenario_id" TEXT NOT NULL,
    "chart_state" TEXT NOT NULL DEFAULT '{}',
    "credibility_score" REAL NOT NULL DEFAULT 0,
    "score_breakdown" TEXT NOT NULL DEFAULT '[]',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserLabSession_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "Scenario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CognitivePrinciple_principle_key_key" ON "CognitivePrinciple"("principle_key");
