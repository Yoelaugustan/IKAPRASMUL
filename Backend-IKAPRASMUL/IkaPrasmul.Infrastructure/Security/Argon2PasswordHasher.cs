using System.Security.Cryptography;
using System.Text;
using Konscious.Security.Cryptography;
using Microsoft.AspNetCore.Identity;

namespace IkaPrasmul.Infrastructure.Security;

/// <summary>
/// Argon2id password hasher (security-standard §2.1) used by ASP.NET Identity.
/// Per-user random salt; constant-time verification. Stored format is
/// "m.t.p.saltBase64.hashBase64" so the work factors travel with the hash.
/// </summary>
public class Argon2PasswordHasher<TUser> : IPasswordHasher<TUser> where TUser : class
{
    // OWASP Argon2id baseline: m=19456 KiB, t=2, p=1.
    private const int MemoryKib = 19456;
    private const int Iterations = 2;
    private const int Parallelism = 1;
    private const int SaltSize = 16;
    private const int HashSize = 32;

    public string HashPassword(TUser user, string password)
    {
        var salt = RandomNumberGenerator.GetBytes(SaltSize);
        var hash = Compute(password, salt, MemoryKib, Iterations, Parallelism, HashSize);
        return string.Join('.',
            MemoryKib, Iterations, Parallelism,
            Convert.ToBase64String(salt), Convert.ToBase64String(hash));
    }

    public PasswordVerificationResult VerifyHashedPassword(
        TUser user, string hashedPassword, string providedPassword)
    {
        var parts = hashedPassword.Split('.');
        if (parts.Length != 5) return PasswordVerificationResult.Failed;

        try
        {
            var memory = int.Parse(parts[0]);
            var iterations = int.Parse(parts[1]);
            var parallelism = int.Parse(parts[2]);
            var salt = Convert.FromBase64String(parts[3]);
            var expected = Convert.FromBase64String(parts[4]);

            var actual = Compute(providedPassword, salt, memory, iterations, parallelism, expected.Length);
            return CryptographicOperations.FixedTimeEquals(actual, expected)
                ? PasswordVerificationResult.Success
                : PasswordVerificationResult.Failed;
        }
        catch
        {
            return PasswordVerificationResult.Failed;
        }
    }

    private static byte[] Compute(
        string password, byte[] salt, int memory, int iterations, int parallelism, int size)
    {
        using var argon = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = salt,
            DegreeOfParallelism = parallelism,
            MemorySize = memory,
            Iterations = iterations,
        };
        return argon.GetBytes(size);
    }
}
