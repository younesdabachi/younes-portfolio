import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useI18n } from '../i18n/I18n';
import { site } from '../data/site';
import { skillGroups } from '../data/skills';
import { projects } from '../data/projects';
import { experiences } from '../data/experience';
import { certificationList, educationList } from '../data/education';
import { triggerOverdrive } from './Overdrive';

interface TerminalLine {
  id: number;
  kind: 'input' | 'output';
  text: string;
}

/**
 * Terminal interactif décoratif : help, whoami, skills, contact, clear.
 * Les commandes affichent les vraies données du portfolio.
 */
export function Terminal() {
  const { dict, lang } = useI18n();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const counter = useRef(0);

  const push = (kind: TerminalLine['kind'], text: string) => {
    counter.current += 1;
    setLines((prev) => [...prev.slice(-60), { id: counter.current, kind, text }]);
  };

  // Message de démarrage
  useEffect(() => {
    setLines([]);
    counter.current = 0;
    push('output', dict.terminal.boot1);
    push('output', dict.terminal.boot2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [lines]);

  const runCommand = (raw: string) => {
    const command = raw.trim().toLowerCase();
    push('input', raw);
    if (command) setHistory((h) => [...h, command]);

    switch (command) {
      case 'help':
        dict.terminal.help.forEach((line) => push('output', line));
        break;
      case 'whoami': {
        const [nameLabel, titleLabel, locLabel] = dict.terminal.whoamiLines;
        push('output', `${nameLabel} : ${site.name}`);
        push('output', `${titleLabel} : ${site.title[lang]}`);
        push('output', `${locLabel} : ${site.location[lang]}`);
        break;
      }
      case 'skills': {
        push('output', dict.terminal.skillsHeader);
        skillGroups.forEach((group) => {
          push('output', `— ${group.title[lang]} : ${group.chips[lang].join(', ')}`);
        });
        break;
      }
      case 'projects': {
        push('output', dict.terminal.projectsHeader);
        projects.forEach((p) => {
          push('output', `— ${p.title} [${p.period}] : ${p.description[lang].split('.')[0]}.`);
        });
        break;
      }
      case 'experience': {
        push('output', dict.terminal.experienceHeader);
        experiences.forEach((e) => {
          push('output', `— ${e.start}–${e.end ?? '…'} : ${e.role[lang]} @ ${e.company}`);
        });
        break;
      }
      case 'education': {
        push('output', dict.terminal.educationHeader);
        educationList.forEach((e) => {
          push('output', `— ${e.title[lang]} @ ${e.org} (${e.period})`);
        });
        push('output', dict.terminal.certsHeader);
        certificationList.forEach((c) => push('output', `— ${c}`));
        break;
      }
      case 'neofetch': {
        dict.terminal.neofetchLines.forEach((line) => push('output', line));
        break;
      }
      case 'overdrive': {
        triggerOverdrive();
        push('output', dict.lab.overdrive);
        break;
      }
      case 'contact': {
        const [emailLabel, phoneLabel, locLabel] = dict.terminal.contactLines;
        push('output', `${emailLabel} : ${site.email}`);
        push('output', `${phoneLabel} : ${site.phoneDisplay}`);
        push('output', `${locLabel} : ${site.location[lang]}`);
        break;
      }
      case 'clear':
        setLines([]);
        break;
      case '':
        break;
      default:
        push('output', `${dict.terminal.unknown} : ${command}`);
        push('output', dict.terminal.unknownHint);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      runCommand(input);
      setInput('');
      setHistoryIndex(-1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (history.length === 0) return;
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? '');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex < 0) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(next);
        setInput(history[next] ?? '');
      }
    }
  };

  return (
    <div
      className="glass gradient-border overflow-hidden rounded-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Barre de titre */}
      <div className="flex items-center gap-2 border-b border-line bg-elevated/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-gold/80" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/50" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/80" aria-hidden="true" />
        <span className="ml-2 font-mono text-[11px] text-muted">{dict.about.terminalTitle}</span>
      </div>

      {/* Sortie */}
      <div
        ref={listRef}
        className="h-64 overflow-y-auto bg-bg/70 px-4 py-3 font-mono text-[12.5px] leading-relaxed"
        role="log"
        aria-label={dict.a11y.terminalOutput}
        aria-live="polite"
      >
        {lines.map((line) =>
          line.kind === 'input' ? (
            <p key={line.id} className="text-text/90">
              <span className="text-accent">➜</span> <span className="text-primary">~</span>{' '}
              {line.text}
            </p>
          ) : (
            <p key={line.id} className="whitespace-pre-wrap text-muted">
              {line.text}
            </p>
          )
        )}
        {/* Ligne de saisie */}
        <p className="flex items-center text-text/90">
          <span className="text-accent">➜</span> <span className="text-primary">~</span>&nbsp;
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none"
            aria-label={dict.a11y.terminalInput}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </p>
      </div>
    </div>
  );
}
