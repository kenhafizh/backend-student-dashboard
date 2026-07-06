import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const classData = [
	{ name: "7A" },
	{ name: "7B" },
	{ name: "7C" },
	{ name: "7D" },
	{ name: "7E" },
	{ name: "7F" },
	{ name: "7G" },
	{ name: "7H" },
];

async function main() {
	console.log("Seeding classes...");
	for (const cls of classData) {
		await prisma.class.upsert({
			where: { name: cls.name },
			update: {},
			create: cls,
		});
	}
	console.log("Seeding completed!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
