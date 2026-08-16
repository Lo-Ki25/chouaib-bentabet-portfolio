"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type ActionResult = { ok: true } | { ok: false; error: string };

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Non autorisé");
  }
  return session;
}

export async function markLeadAsRead(id: string): Promise<ActionResult> {
  await requireAdmin();

  if (!id) {
    return { ok: false, error: "ID manquant" };
  }

  try {
    await prisma.lead.update({
      where: { id },
      data: { read: true },
    });
  } catch (err) {
    console.error("markLeadAsRead", err);
    return { ok: false, error: "Échec de la mise à jour" };
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { ok: true };
}
