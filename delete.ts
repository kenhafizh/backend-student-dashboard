import { prisma } from "./src/db";
async function main() {
  await prisma.student.deleteMany({});
  console.log("Semua data siswa berhasil dihapus.");
}
main().finally(() => prisma.$disconnect());
