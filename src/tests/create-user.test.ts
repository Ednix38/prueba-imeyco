import { describe, it, expect, vi } from "vitest";
import { createUser } from "../services/user.service";

// Mock de supabase
vi.mock("../lib/supabase", () => ({
  supabase: {
    from: () => ({
      insert: () => ({ error: null })
    })
  }
}));

describe("createUser", () => {
  it("crea usuario correctamente", async () => {
    const result = await createUser("test@mail.com", "Enoc");
    expect(result.success).toBe(true);
  });

  it("falla si faltan datos", async () => {
    await expect(createUser("", ""))
      .rejects
      .toThrow("Datos requeridos");
  });
});
