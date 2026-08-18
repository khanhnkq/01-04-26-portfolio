"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type {
  ArchitectureNode,
  ArchitectureScenario,
  ArchitectureStep,
  ProjectArchitecture,
} from "@/data/projects";
import styles from "./ShowcaseArchive.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

const EVIDENCE_LABELS: Record<ProjectArchitecture["evidence"], string> = {
  "repo-confirmed": "Repo confirmed",
  "conceptual-target": "Concept architecture",
  unavailable: "Private architecture",
};

function ReplayIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path
        d="M5 8V4m0 0h4M5 4l3.1 3.1A7 7 0 1 1 5.3 16"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="2"
      />
    </svg>
  );
}

function NodeCard({
  index,
  isActive,
  node,
  replayKey,
  shouldReduceMotion,
}: {
  index: number;
  isActive: boolean;
  node: ArchitectureNode;
  replayKey: number;
  shouldReduceMotion: boolean;
}) {
  const delay = index * 0.58;

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? undefined
          : !isActive
            ? {
                backgroundColor: "#fff9ef",
                opacity: 0,
                y: 14,
              }
          : {
              backgroundColor: ["#fff9ef", "#ffe06b", "#fff9ef"],
              opacity: 1,
              y: [14, -5, 0],
            }
      }
      className={styles.architectureNode}
      data-kind={node.kind}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      key={`${replayKey}-${node.id}`}
      transition={{
        backgroundColor: { delay, duration: 0.52, times: [0, 0.5, 1] },
        opacity: { delay, duration: 0.25 },
        y: { delay, duration: 0.52, ease: EASE },
      }}>
      <span className={styles.architectureNodeIndex}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <strong>{node.label}</strong>
      <span>{node.detail}</span>
      <small>{node.kind}</small>
    </motion.div>
  );
}

function DesktopConnector({
  index,
  isActive,
  replayKey,
  shouldReduceMotion,
  step,
}: {
  index: number;
  isActive: boolean;
  replayKey: number;
  shouldReduceMotion: boolean;
  step: ArchitectureStep;
}) {
  const delay = index * 0.58 + 0.28;

  return (
    <div
      aria-label={`${step.label}: ${step.from} to ${step.to}`}
      className={styles.architectureConnector}
      data-flow-type={step.type}>
      <span className={styles.connectorLabel}>{step.label}</span>
      <motion.span
        animate={
          shouldReduceMotion
            ? undefined
            : isActive
              ? { scaleX: 1 }
              : { scaleX: 0 }
        }
        className={styles.connectorLine}
        initial={shouldReduceMotion ? false : { scaleX: 0 }}
        key={`desktop-line-${replayKey}-${index}`}
        transition={{ delay, duration: 0.42, ease: EASE }}
      />
      {!shouldReduceMotion && isActive && (
        <motion.span
          animate={{ left: "calc(100% - 9px)", opacity: [0, 1, 1, 0] }}
          className={styles.connectorPacket}
          initial={{ left: 0, opacity: 0 }}
          key={`desktop-packet-${replayKey}-${index}`}
          transition={{ delay, duration: 0.58, ease: "linear" }}
        />
      )}
    </div>
  );
}

function MobileConnector({
  index,
  isActive,
  replayKey,
  shouldReduceMotion,
  step,
}: {
  index: number;
  isActive: boolean;
  replayKey: number;
  shouldReduceMotion: boolean;
  step: ArchitectureStep;
}) {
  const delay = index * 0.58 + 0.28;

  return (
    <div
      aria-label={`${step.label}: ${step.from} to ${step.to}`}
      className={styles.architectureConnectorMobile}
      data-flow-type={step.type}>
      <span className={styles.connectorLabelMobile}>{step.label}</span>
      <motion.span
        animate={
          shouldReduceMotion
            ? undefined
            : isActive
              ? { scaleY: 1 }
              : { scaleY: 0 }
        }
        className={styles.connectorLineMobile}
        initial={shouldReduceMotion ? false : { scaleY: 0 }}
        key={`mobile-line-${replayKey}-${index}`}
        transition={{ delay, duration: 0.42, ease: EASE }}
      />
      {!shouldReduceMotion && isActive && (
        <motion.span
          animate={{ opacity: [0, 1, 1, 0], top: "calc(100% - 9px)" }}
          className={styles.connectorPacketMobile}
          initial={{ opacity: 0, top: 0 }}
          key={`mobile-packet-${replayKey}-${index}`}
          transition={{ delay, duration: 0.58, ease: "linear" }}
        />
      )}
    </div>
  );
}

function FlowSequence({
  isActive,
  replayKey,
  scenario,
  shouldReduceMotion,
}: {
  isActive: boolean;
  replayKey: number;
  scenario: ArchitectureScenario;
  shouldReduceMotion: boolean;
}) {
  return (
    <div className={styles.architectureViewport}>
      <ol
        aria-label={`${scenario.label} architecture request flow`}
        className={styles.architectureSequence}>
        {scenario.nodes.map((node, index) => (
          <li className={styles.architectureSequencePart} key={node.id}>
            <NodeCard
              index={index}
              isActive={isActive}
              node={node}
              replayKey={replayKey}
              shouldReduceMotion={shouldReduceMotion}
            />
            {scenario.steps[index] && (
              <DesktopConnector
                index={index}
                isActive={isActive}
                replayKey={replayKey}
                shouldReduceMotion={shouldReduceMotion}
                step={scenario.steps[index]}
              />
            )}
          </li>
        ))}
      </ol>

      <ol
        aria-label={`${scenario.label} architecture request flow`}
        className={styles.architectureSequenceMobile}>
        {scenario.nodes.map((node, index) => (
          <li className={styles.architectureSequencePartMobile} key={node.id}>
            <NodeCard
              index={index}
              isActive={isActive}
              node={node}
              replayKey={replayKey}
              shouldReduceMotion={shouldReduceMotion}
            />
            {scenario.steps[index] && (
              <MobileConnector
                index={index}
                isActive={isActive}
                replayKey={replayKey}
                shouldReduceMotion={shouldReduceMotion}
                step={scenario.steps[index]}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export type ArchitectureFlowProps = {
  architecture: ProjectArchitecture;
  projectTitle: string;
};

export default function ArchitectureFlow({
  architecture,
  projectTitle,
}: ArchitectureFlowProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const panelRef = useRef<HTMLDivElement>(null);
  const replayTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isInView = useInView(panelRef, { amount: 0.15, once: true });
  const tabId = useId();
  const [activeScenarioId, setActiveScenarioId] = useState(
    architecture.scenarios[0]?.id ?? "",
  );
  const [replayKey, setReplayKey] = useState(0);
  const activeScenario = useMemo(
    () =>
      architecture.scenarios.find(
        (scenario) => scenario.id === activeScenarioId,
      ) ?? architecture.scenarios[0],
    [activeScenarioId, architecture.scenarios],
  );
  useEffect(
    () => () => {
      replayTimelineRef.current?.kill();
    },
    [],
  );

  const replayFlow = () => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const visibleElements = (selector: string) =>
      Array.from(panel.querySelectorAll<HTMLElement>(selector)).filter(
        (element) => element.getClientRects().length > 0,
      );
    const nodes = visibleElements(`.${styles.architectureNode}`);
    const horizontalLines = visibleElements(`.${styles.connectorLine}`);
    const verticalLines = visibleElements(`.${styles.connectorLineMobile}`);
    const lines = horizontalLines.length > 0 ? horizontalLines : verticalLines;
    const isVertical = verticalLines.length > 0;

    replayTimelineRef.current?.kill();
    gsap.set(nodes, {
      backgroundColor: "#fff9ef",
      opacity: 0,
      y: 14,
    });
    gsap.set(lines, isVertical ? { scaleY: 0 } : { scaleX: 0 });

    const timeline = gsap.timeline();

    nodes.forEach((node, index) => {
      const start = index * 0.5;

      timeline
        .to(
          node,
          {
            backgroundColor: "#ffe06b",
            duration: 0.24,
            ease: "power2.out",
            opacity: 1,
            y: -5,
          },
          start,
        )
        .to(
          node,
          {
            backgroundColor: "#fff9ef",
            duration: 0.24,
            ease: "power2.inOut",
            y: 0,
          },
          start + 0.24,
        );

      if (lines[index]) {
        timeline.to(
          lines[index],
          isVertical
            ? { duration: 0.3, ease: "power2.out", scaleY: 1 }
            : { duration: 0.3, ease: "power2.out", scaleX: 1 },
          start + 0.2,
        );
      }
    });

    replayTimelineRef.current = timeline;
  };

  const selectScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setReplayKey((current) => current + 1);
  };

  return (
    <div
      className={styles.architecturePanel}
      id={`architecture-${projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      ref={panelRef}>
      <div className={styles.architecturePanelHeader}>
        <div>
          <div className={styles.architectureEyebrow}>
            <span
              className={styles.evidenceBadge}
              data-evidence={architecture.evidence}>
              {EVIDENCE_LABELS[architecture.evidence]}
            </span>
            <span>System dossier / {String(projectTitle).toUpperCase()}</span>
          </div>
          <h3>{architecture.title}</h3>
          <p>{architecture.summary}</p>
        </div>
        {architecture.sourceUrl ? (
          <a
            className={styles.architectureSource}
            href={architecture.sourceUrl}
            rel="noreferrer"
            target="_blank">
            {architecture.sourceLabel} ↗
          </a>
        ) : (
          <span className={styles.architectureSourceMuted}>
            {architecture.sourceLabel}
          </span>
        )}
      </div>

      {architecture.evidence === "unavailable" || !activeScenario ? (
        <div className={styles.architectureUnavailable}>
          <span aria-hidden="true">PRIVATE_SYS</span>
          <div>
            <strong>Private architecture.</strong>
            <p>{architecture.unavailableReason}</p>
          </div>
        </div>
      ) : (
        <div className={styles.architectureScrollStage}>
          <div className={styles.architectureToolbar}>
            <div
              aria-label={`${projectTitle} architecture flows`}
              className={styles.scenarioTabs}
              role="tablist">
              {architecture.scenarios.map((scenario) => {
                const selected = scenario.id === activeScenario.id;

                return (
                  <button
                    aria-controls={`${tabId}-${scenario.id}`}
                    aria-selected={selected}
                    className={styles.scenarioTab}
                    id={`${tabId}-${scenario.id}-tab`}
                    key={scenario.id}
                    onClick={() => selectScenario(scenario.id)}
                    role="tab"
                    tabIndex={selected ? 0 : -1}
                    type="button">
                    {scenario.label}
                  </button>
                );
              })}
            </div>

            <button
              className={styles.replayButton}
              onClick={replayFlow}
              type="button">
              <ReplayIcon />
              {shouldReduceMotion ? "Reset flow" : "Replay flow"}
            </button>
          </div>

          <div
            aria-labelledby={`${tabId}-${activeScenario.id}-tab`}
            id={`${tabId}-${activeScenario.id}`}
            role="tabpanel">
            <p className={styles.scenarioDescription}>
              {activeScenario.description}
            </p>
            <FlowSequence
              isActive={isInView}
              replayKey={replayKey}
              scenario={activeScenario}
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>

          <ul aria-label="Flow legend" className={styles.architectureLegend}>
            <li data-flow-type="request">Request</li>
            <li data-flow-type="response">Response</li>
            <li data-flow-type="event">Event / realtime</li>
            <li data-flow-type="local">Local handoff</li>
          </ul>
        </div>
      )}
    </div>
  );
}
