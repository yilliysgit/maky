// sanity/structure.ts
import type { StructureResolver } from "sanity/structure"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([

      // ═══════════════════════════════════════════════════════
      // 🏠 HOMEPAGE — singleton
      // ═══════════════════════════════════════════════════════
      S.listItem()
        .title("🏠 Homepage")
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .title("Homepage")
        ),

      S.divider(),

      // ═══════════════════════════════════════════════════════
      // 🛠️ DIENSTEN
      // ═══════════════════════════════════════════════════════
      S.listItem()
        .title("🛠️ Diensten")
        .child(
          S.list()
            .title("Diensten")
            .items([

              S.listItem()
                .title("📁 Categorieën")
                .child(
                  S.documentTypeList("category")
                    .title("Alle Categorieën")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                    .child((categoryId) =>
                      S.list()
                        .title("Categorie opties")
                        .items([
                          S.listItem()
                            .title("✏️ Bewerk Categorie")
                            .child(
                              S.document()
                                .schemaType("category")
                                .documentId(categoryId)
                            ),

                          S.divider(),

                          S.listItem()
                            .title("📄 Subcategorieën")
                            .child(
                              S.documentList()
                                .title("Subcategorieën")
                                .filter('_type == "subcategory" && parentCategory._ref == $categoryId')
                                .params({ categoryId })
                                .defaultOrdering([{ field: "order", direction: "asc" }])
                                .child((subcategoryId) =>
                                  S.list()
                                    .title("Subcategorie opties")
                                    .items([
                                      S.listItem()
                                        .title("✏️ Bewerk Subcategorie")
                                        .child(
                                          S.document()
                                            .schemaType("subcategory")
                                            .documentId(subcategoryId)
                                        ),

                                      S.divider(),

                                      S.listItem()
                                        .title("📝 Services")
                                        .child(
                                          S.documentList()
                                            .title("Services")
                                            .filter('_type == "service" && parentSubcategory._ref == $subcategoryId')
                                            .params({ subcategoryId })
                                            .defaultOrdering([{ field: "order", direction: "asc" }])
                                        ),
                                    ])
                                )
                            ),
                        ])
                    )
                ),

              S.divider(),

              S.listItem()
                .title("📄 Alle Subcategorieën")
                .child(
                  S.documentTypeList("subcategory")
                    .title("Alle Subcategorieën")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                    .child((subcategoryId) =>
                      S.list()
                        .title("Subcategorie opties")
                        .items([
                          S.listItem()
                            .title("✏️ Bewerk Subcategorie")
                            .child(
                              S.document()
                                .schemaType("subcategory")
                                .documentId(subcategoryId)
                            ),

                          S.divider(),

                          S.listItem()
                            .title("📝 Services")
                            .child(
                              S.documentList()
                                .title("Services")
                                .filter('_type == "service" && parentSubcategory._ref == $subcategoryId')
                                .params({ subcategoryId })
                                .defaultOrdering([{ field: "order", direction: "asc" }])
                            ),
                        ])
                    )
                ),

              S.divider(),

              S.listItem()
                .title("📝 Alle Services")
                .child(
                  S.documentTypeList("service")
                    .title("Alle Services")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),

              S.divider(),

              S.listItem()
                .title("🔗 Blader door hiërarchie")
                .child(
                  S.documentTypeList("category")
                    .title("1. Kies Categorie")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                    .child((categoryId) =>
                      S.documentList()
                        .title("2. Kies Subcategorie")
                        .filter('_type == "subcategory" && parentCategory._ref == $categoryId')
                        .params({ categoryId })
                        .defaultOrdering([{ field: "order", direction: "asc" }])
                        .child((subcategoryId) =>
                          S.documentList()
                            .title("3. Kies Service")
                            .filter('_type == "service" && parentSubcategory._ref == $subcategoryId')
                            .params({ subcategoryId })
                            .defaultOrdering([{ field: "order", direction: "asc" }])
                            .child((serviceId) =>
                              S.document()
                                .schemaType("service")
                                .documentId(serviceId)
                            )
                        )
                    )
                ),
            ])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════════════
      // 📁 PROJECTEN
      // ═══════════════════════════════════════════════════════
      S.listItem()
        .title("📁 Projecten")
        .child(
          S.documentTypeList("project")
            .title("Alle Projecten")
        ),

      S.divider(),

      // ═══════════════════════════════════════════════════════
      // OVERIGE
      // ═══════════════════════════════════════════════════════
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            "homepage",
            "category",
            "subcategory",
            "service",
            "project",
          ].includes(item.getId() || "")
      ),
    ])