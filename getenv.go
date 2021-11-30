// This is a PoC/illustrative code to show how to share a single integer that goes up in k6 on a
// single instance

package increment

import (
	"os"
	"strconv"

	"go.k6.io/k6/js/modules"
)

func init() {
	modules.Register("k6/x/getenv", New())
}

type Module struct{}

func (m *Module) GetEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return defaultValue
	}
	return value
}

func (m *Module) GetEnvInt(key string, defaultValue int) int {
	value := os.Getenv(key)
	if len(value) == 0 {
		return defaultValue
	}
	n, err := strconv.Atoi(value)
	if err != nil {
		panic(err)
	}
	return n
}

func (m *Module) GetString(value, defaultValue string) string {
	if len(value) == 0 {
		return defaultValue
	}
	return value
}

func (m *Module) GetInt(value string, defaultValue int) int {
	if len(value) == 0 {
		return defaultValue
	}
	n, err := strconv.Atoi(value)
	if err != nil {
		panic(err)
	}
	return n
}

func New() *Module {
	return &Module{}
}
