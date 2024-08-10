import { AbilityBuilder, PureAbility } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";
import { Book, Role, User } from "@prisma/client";

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      Book: Book;
    }>
  ],
  PrismaQuery
>;

export function defineAbilty(user: User): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility
  );

  if (user.role == "admin") {
    can("disable", "User").because("Admin can disable owners");
    can("approve", "User").because("admin can approve book owner");
    can("delete", "User").because("Admin cad delete owner");
  }

  if (user.role == "owner") {
    can("update", "Book", { ownerId: user.id }).because(
      "owner can update his books"
    );
    can("delete", "Book", { ownerId: user.id }).because(
      "owner can delele his books"
    );
  }

  const ability = build();

  return ability;
}
