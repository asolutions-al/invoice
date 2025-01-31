import { pgTable, uuid, timestamp, text, foreignKey, doublePrecision, jsonb, real, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { CustomerSchemaT, ProductSchemaT } from "@/db/app/schema"

export const idType = pgEnum("IdType", ['tin', 'id'])
export const currency = pgEnum("currency", ['ALL', 'EUR', 'USD'])
export const discountType = pgEnum("discountType", ['value', 'percentage'])
export const payMethod = pgEnum("payMethod", ['cash', 'card', 'bank', 'other'])
export const recordStatus = pgEnum("recordStatus", ['draft', 'completed'])
export const role = pgEnum("role", ['admin', 'owner', 'member'])
export const status = pgEnum("status", ['draft', 'active', 'archived'])


export const user = pgTable("user", {
	id: uuid().primaryKey().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	email: text().notNull(),
	displayName: text(),
});

export const invoice = pgTable("invoice", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	unitId: uuid().notNull(),
	total: doublePrecision().notNull(),
	payMethod: payMethod().notNull(),
	currency: currency().notNull(),
	customerId: uuid().notNull(),
	exchangeRate: doublePrecision().notNull(),
	discountValue: doublePrecision().notNull(),
	discountType: discountType().notNull(),
	notes: text(),
	status: recordStatus().notNull(),
	orgId: uuid().notNull(),
	subtotal: doublePrecision().notNull(),
	tax: doublePrecision().notNull(),
	date: timestamp({ withTimezone: true, mode: 'string' }),
	customer: jsonb().notNull().$type<CustomerSchemaT>(),
}, (table) => [
	foreignKey({
			columns: [table.orgId],
			foreignColumns: [organization.id],
			name: "invoice_orgId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.unitId],
			foreignColumns: [unit.id],
			name: "invoice_unitId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const organization = pgTable("organization", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text().notNull(),
	description: text(),
	ownerId: uuid().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [user.id],
			name: "organization_ownerId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const customer = pgTable("customer", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	unitId: uuid().notNull(),
	name: text().notNull(),
	status: status().notNull(),
	description: text(),
	imageBucketPath: text(),
	idType: idType(),
	email: text(),
	address: text(),
	city: text(),
	idValue: text(),
	orgId: uuid().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.orgId],
			foreignColumns: [organization.id],
			name: "customer_orgId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.unitId],
			foreignColumns: [unit.id],
			name: "customer_unitId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const unit = pgTable("unit", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	orgId: uuid().notNull(),
	name: text().notNull(),
	description: text(),
}, (table) => [
	foreignKey({
			columns: [table.orgId],
			foreignColumns: [organization.id],
			name: "unit_orgId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const member = pgTable("member", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	unitId: uuid().notNull(),
	userId: uuid().notNull(),
	role: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.unitId],
			foreignColumns: [unit.id],
			name: "member_unitId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "member_userId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const invitation = pgTable("invitation", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	unitId: uuid().notNull(),
	userId: uuid().notNull(),
	orgId: uuid().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.orgId],
			foreignColumns: [organization.id],
			name: "invitation_orgId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.unitId],
			foreignColumns: [unit.id],
			name: "invitation_unitId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "invitation_userId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const product = pgTable("product", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	unitId: uuid().notNull(),
	name: text().notNull(),
	price: doublePrecision().notNull(),
	status: status().notNull(),
	barcode: text(),
	description: text(),
	imageBucketPath: text(),
	orgId: uuid().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.orgId],
			foreignColumns: [organization.id],
			name: "product_orgId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.unitId],
			foreignColumns: [unit.id],
			name: "product_unitId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const invoiceRow = pgTable("invoiceRow", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	productId: uuid().notNull(),
	name: text().notNull(),
	quantity: doublePrecision().notNull(),
	unitPrice: real().notNull(),
	invoiceId: uuid().notNull(),
	total: doublePrecision().notNull(),
	unitId: uuid().notNull(),
	orgId: uuid().notNull(),
	subtotal: doublePrecision().notNull(),
	tax: doublePrecision().notNull(),
	product: jsonb().notNull().$type<ProductSchemaT>(),
}, (table) => [
	foreignKey({
			columns: [table.invoiceId],
			foreignColumns: [invoice.id],
			name: "invoiceRow_invoiceId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.orgId],
			foreignColumns: [organization.id],
			name: "invoiceRow_orgId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [product.id],
			name: "invoiceRow_productId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.unitId],
			foreignColumns: [unit.id],
			name: "invoiceRow_unitId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);
