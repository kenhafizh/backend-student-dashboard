import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const grades = ["7", "8", "9"];
const sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

const classData = grades.flatMap((grade) =>
	sections.map((section) => ({ name: `${grade}${section}` })),
);

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
