import { c as SLOWS_OPTIONS, f as parseManager, i as NEED_OPTIONS, l as answersComplete, m as sanitizeAnswers, n as HABITS, o as QUOTE_FIELDS, p as roleLabel, r as MANAGERS, s as ROLE_OPTIONS, u as habitLabel } from "./survey-Da1vCcTb.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as string, i as record, r as object, s as unknown } from "../_libs/zod.mjs";
import { createHash, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/survey-server-B53s6uq7.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _0002_patio_default = "create table if not exists patio_marks (\n  id serial primary key,\n  zone text not null,\n  vibe smallint not null,\n  pour smallint not null,\n  plate smallint not null,\n  service smallint not null,\n  sound smallint not null,\n  tags text not null default '[]',\n  note text,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists patio_marks_created_at_idx on patio_marks (created_at desc);\n\ninsert into patio_marks (zone, vibe, pour, plate, service, sound, tags, note, created_at)\nselect * from (\n  values\n    ('rail', 5, 4, 5, 5, 4, '[\"locked-in\",\"lights-hit\"]', 'String lights did the thing tonight.', now() - interval '18 minutes'),\n    ('firepit', 5, 5, 4, 5, 5, '[\"music-right\",\"come-back\"]', 'Firepit was the room.', now() - interval '41 minutes'),\n    ('bar', 4, 5, 4, 4, 3, '[\"staff-on-it\",\"packed\"]', 'Pour was clean. Bar got loud after ten.', now() - interval '1 hour 12 minutes'),\n    ('garden', 4, 4, 5, 4, 4, '[\"lights-hit\"]', 'Plate hit. Garden felt like a secret.', now() - interval '2 hours 5 minutes'),\n    ('corner', 3, 4, 3, 5, 2, '[\"too-loud\",\"staff-on-it\"]', 'Corner caught the speaker. Staff moved us.', now() - interval '2 hours 48 minutes'),\n    ('lights', 5, 4, 4, 4, 5, '[\"locked-in\",\"music-right\"]', null, now() - interval '3 hours 10 minutes'),\n    ('rail', 4, 3, 4, 3, 4, '[\"slow-ticket\",\"packed\"]', 'Ticket lagged but the rail held.', now() - interval '4 hours'),\n    ('garden', 5, 5, 5, 5, 4, '[\"come-back\",\"locked-in\"]', null, now() - interval '22 hours'),\n    ('bar', 4, 4, 3, 4, 4, '[\"packed\"]', null, now() - interval '1 day 3 hours'),\n    ('firepit', 3, 3, 4, 4, 5, '[\"cold-seats\",\"music-right\"]', 'Bring a layer. Soundtrack was right.', now() - interval '2 days 5 hours'),\n    ('rail', 5, 5, 4, 5, 5, '[\"staff-on-it\",\"lights-hit\"]', null, now() - interval '3 days 2 hours'),\n    ('corner', 4, 4, 4, 3, 3, '[\"long-wait\"]', 'Wait was real. Night still worked.', now() - interval '4 days 6 hours'),\n    ('lights', 5, 4, 5, 5, 5, '[\"locked-in\",\"come-back\"]', 'This is the patio.', now() - interval '5 days 1 hour'),\n    ('garden', 4, 4, 4, 4, 4, '[\"lights-hit\"]', null, now() - interval '6 days 4 hours')\n) as seed(zone, vibe, pour, plate, service, sound, tags, note, created_at)\nwhere not exists (select 1 from patio_marks limit 1);\n";
var _0003_foh_responses_default = "create table if not exists foh_responses (\n  id serial primary key,\n  answers text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists foh_responses_created_at_idx on foh_responses (created_at desc);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({
			"/migrations/0002_patio.sql": _0002_patio_default,
			"/migrations/0003_foh_responses.sql": _0003_foh_responses_default
		});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
var RESULTS_PASSWORD = "thepatio";
function passwordMatches(input) {
	const a = createHash("sha256").update(input).digest();
	const b = createHash("sha256").update(RESULTS_PASSWORD).digest();
	return timingSafeEqual(a, b);
}
function parseRow(row) {
	try {
		return {
			id: row.id,
			answers: sanitizeAnswers(JSON.parse(row.answers))
		};
	} catch {
		return {
			id: row.id,
			answers: {}
		};
	}
}
var submitSurvey_createServerFn_handler = createServerRpc({
	id: "24c0a08176a7528040c09f15db1d5e7ba334d27610b08a22b412bf72ba7d49fe",
	name: "submitSurvey",
	filename: "src/lib/survey-server.ts"
}, (opts) => submitSurvey.__executeServer(opts));
var submitSurvey = createServerFn({ method: "POST" }).validator((data) => object({ answers: record(string(), unknown()) }).parse(data)).handler(submitSurvey_createServerFn_handler, async ({ data }) => {
	const answers = sanitizeAnswers(data.answers);
	if (!answersComplete(answers)) throw new Error("Some answers are missing. Go back and finish, then submit.");
	await (await getSql())`
      insert into foh_responses (answers)
      values (${JSON.stringify(answers)})
    `;
	return { ok: true };
});
function avgScale(rows, key) {
	const nums = rows.map((r) => r.answers[key]).filter((n) => typeof n === "number" && n >= 1 && n <= 5);
	if (!nums.length) return null;
	return nums.reduce((a, b) => a + b, 0) / nums.length;
}
function countChoice(rows, key, options, multi = false) {
	const counts = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const value = row.answers[key];
		const ids = multi ? Array.isArray(value) ? value.map(String) : [] : typeof value === "string" ? [value] : [];
		for (const id of ids) counts.set(id, (counts.get(id) ?? 0) + 1);
	}
	return options.map((opt) => ({
		id: opt.id,
		label: opt.label,
		count: counts.get(opt.id) ?? 0
	})).filter((item) => item.count > 0).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}
function buildSummary(rows) {
	const managerScores = MANAGERS.map((manager) => {
		const rated = rows.map((r) => parseManager(r.answers[`mgr_${manager.id}`])).filter((n) => !n.skipped).filter((n) => HABITS.every((h) => typeof n.habits[h.id] === "number"));
		const habits = HABITS.map((habit) => {
			const nums = rated.map((n) => n.habits[habit.id]).filter((n) => typeof n === "number");
			return {
				id: habit.id,
				label: habitLabel(habit.id),
				avg: nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null
			};
		});
		const overallNums = rated.map((n) => {
			const vals = HABITS.map((h) => n.habits[h.id]).filter((x) => typeof x === "number");
			if (!vals.length) return null;
			return vals.reduce((a, b) => a + b, 0) / vals.length;
		}).filter((n) => n != null);
		return {
			id: manager.id,
			overall: overallNums.length ? overallNums.reduce((a, b) => a + b, 0) / overallNums.length : null,
			responses: rated.length,
			habits
		};
	});
	const managerQuotes = [];
	const quotes = [];
	for (const row of rows) {
		const role = roleLabel(row.answers.role);
		for (const manager of MANAGERS) {
			const note = parseManager(row.answers[`mgr_${manager.id}`]);
			if (note.skipped) continue;
			const strength = note.strength.trim();
			const weakness = note.weakness.trim();
			if (strength) managerQuotes.push({
				id: String(row.id),
				field: `${manager.label} — strength`,
				role,
				text: strength
			});
			if (weakness) managerQuotes.push({
				id: String(row.id),
				field: `${manager.label} — weakness`,
				role,
				text: weakness
			});
		}
		for (const field of QUOTE_FIELDS) {
			const text = row.answers[field.id];
			if (typeof text === "string" && text.trim()) quotes.push({
				id: String(row.id),
				field: field.field,
				role,
				text: text.trim()
			});
		}
	}
	return {
		total: rows.length,
		averages: {
			week_setup: avgScale(rows, "week_setup"),
			team_back: avgScale(rows, "team_back"),
			mgmt_heard: avgScale(rows, "mgmt_heard")
		},
		roles: countChoice(rows, "role", ROLE_OPTIONS),
		slows: countChoice(rows, "slows", SLOWS_OPTIONS),
		needs: countChoice(rows, "mgmt_need", NEED_OPTIONS, true),
		managerQuotes,
		managerScores,
		quotes
	};
}
var getResults_createServerFn_handler = createServerRpc({
	id: "50887c27cb6d96f129d0c66affb41a2b56f6018a969745bf993cf6a5db0ab634",
	name: "getResults",
	filename: "src/lib/survey-server.ts"
}, (opts) => getResults.__executeServer(opts));
var getResults = createServerFn({ method: "POST" }).validator((data) => object({ password: string().min(1).max(200) }).parse(data)).handler(getResults_createServerFn_handler, async ({ data }) => {
	if (!passwordMatches(data.password)) return {
		ok: false,
		error: "Wrong password."
	};
	return {
		ok: true,
		summary: buildSummary((await (await getSql())`
      select id, answers from foh_responses order by created_at desc limit 500
    `).map(parseRow))
	};
});
//#endregion
export { getResults_createServerFn_handler, submitSurvey_createServerFn_handler };
