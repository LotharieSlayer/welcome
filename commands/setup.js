const { setupWelcome } = require("../utils/enmapUtils");

async function addSetupCommand(slashCommand) {
    slashCommand.addSubcommand((subcommand) =>
    subcommand
        .setName("welcome")
        .setDescription(
            "Définir/Supprimer le channel pour les bienvenus. (Il ne peut n'y en avoir qu'un)"
        )
    )
}

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'setup'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    switch (interaction.options._subcommand) {
        case "welcome":
            if (setupWelcome.get(interaction.guild.id) === undefined) {
                setupWelcome.set(interaction.guild.id, interaction.channel.id);
                await interaction.reply({
                    content: `Channel pour les bienvenus ajouté au serveur dans <#${interaction.channel.id}> !`,
                    ephemeral: true,
                });
            } else {
                setupWelcome.delete(interaction.guild.id);
                await interaction.reply({
                    content: `Channel pour les bienvenus supprimé du serveur !`,
                    ephemeral: true,
                });
            }
            break;
    }
}

module.exports = {
    addSetupCommand,
    execute,
};
